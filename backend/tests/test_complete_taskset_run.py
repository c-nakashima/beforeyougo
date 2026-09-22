import os
import unittest
from unittest.mock import MagicMock, patch
from uuid import uuid4

from fastapi.testclient import TestClient

# Tests replace all connections and never connect to this placeholder database.
os.environ.setdefault("DATABASE_URL", "postgresql://localhost/beforeyougo_test")

from app.main import app

# Test Complete Tasksets' Run
class CompleteTasksetRunTests(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        self.connection = MagicMock()
        self.cursor = (
            self.connection.__enter__
            .return_value.cursor.return_value.__enter__.return_value
        )
        self.connection_patch = patch(
            "app.routers.tasksets.get_connection",
            return_value=self.connection,
        )
        self.connection_patch.start()
        self.addCleanup(self.connection_patch.stop)
        self.run_id = str(uuid4())
        self.base = "/api/backend/tasksets"

    # Attempt to complete the run with unchecked items
    def test_cannot_complete_run_with_unchecked_items(self):
        self.cursor.fetchone.return_value = {"unchecked_count": 1}

        # When there are unchecked items, return 400
        response = self.client.post(
            f"{self.base}/taskset-runs/{self.run_id}/complete"
        )

        self.assertEqual(response.status_code, 400)
        self.assertEqual(
            response.json()["detail"],
            "Cannot complete a run with unchecked items",
        )
        # Only the SQL that counts unchecked items is executed
        self.assertEqual(self.cursor.execute.call_count, 1)

    # Successfully complete the run without unchecked items
    def test_complete_run(self):
        self.cursor.fetchone.side_effect = [
            {"unchecked_count": 0},
            {"id": self.run_id, "status": "done"},
        ]

        # When there are no unchecked items, return 200
        response = self.client.post(
            f"{self.base}/taskset-runs/{self.run_id}/complete"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "done")
        self.assertEqual(
            self.cursor.execute.call_args.args[1],
            (self.run_id,),
        )
        # Both the count and update SQL statements are executed
        self.assertEqual(self.cursor.execute.call_count, 2)
