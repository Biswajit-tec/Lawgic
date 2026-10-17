"""
Tests for the AI Service health endpoints.
These tests verify the service starts and health endpoints respond correctly.
"""

import pytest
from fastapi.testclient import TestClient


# We need to set required env vars before importing the app
import os
os.environ.setdefault("AI_SERVICE_API_KEY", "test-api-key-for-testing-minimum-32-characters")
os.environ.setdefault("DATABASE_URL", "postgresql://test:test@localhost:5432/test_lawgic")
os.environ.setdefault("ENVIRONMENT", "test")


from app.main import app  # noqa: E402


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)


class TestHealthEndpoints:
    """Test health check endpoints — no auth required."""

    def test_health_check_returns_200(self, client: TestClient) -> None:
        response = client.get("/api/v1/health")
        assert response.status_code == 200

    def test_health_check_response_structure(self, client: TestClient) -> None:
        response = client.get("/api/v1/health")
        data = response.json()
        assert "status" in data
        assert "version" in data
        assert "environment" in data
        assert data["environment"] == "test"

    def test_readiness_check(self, client: TestClient) -> None:
        response = client.get("/api/v1/health/ready")
        assert response.status_code == 200
        assert response.json()["ready"] is True

    def test_liveness_check(self, client: TestClient) -> None:
        response = client.get("/api/v1/health/live")
        assert response.status_code == 200
        assert response.json()["alive"] is True


class TestSecurityEndpoints:
    """Test that protected endpoints require valid API key."""

    def test_ocr_endpoint_requires_api_key(self, client: TestClient) -> None:
        """OCR endpoint must reject requests without API key."""
        response = client.post("/api/v1/ocr/process", json={
            "storage_path": "documents/test/test.pdf",
            "mime_type": "application/pdf",
            "document_id": "00000000-0000-0000-0000-000000000001",
        })
        assert response.status_code == 401

    def test_ocr_endpoint_rejects_invalid_api_key(self, client: TestClient) -> None:
        """OCR endpoint must reject invalid API keys."""
        response = client.post(
            "/api/v1/ocr/process",
            json={
                "storage_path": "documents/test/test.pdf",
                "mime_type": "application/pdf",
                "document_id": "00000000-0000-0000-0000-000000000001",
            },
            headers={"X-API-Key": "wrong-key"},
        )
        assert response.status_code == 403

    def test_embeddings_endpoint_requires_api_key(self, client: TestClient) -> None:
        response = client.post("/api/v1/embeddings/embed", json={"texts": ["test"]})
        assert response.status_code == 401

    def test_llm_endpoint_requires_api_key(self, client: TestClient) -> None:
        response = client.post("/api/v1/llm/generate", json={
            "system_prompt": "test",
            "messages": []
        })
        assert response.status_code == 401

    def test_translation_endpoint_requires_api_key(self, client: TestClient) -> None:
        response = client.post("/api/v1/translation/translate", json={
            "text": "test",
            "source_language": "en",
            "target_language": "hi",
        })
        assert response.status_code == 401

    def test_global_error_handler_does_not_expose_stack_trace(self, client: TestClient) -> None:
        """Error responses must never expose stack traces or internal details."""
        # Hit a non-existent endpoint
        response = client.get("/api/v1/does-not-exist")
        assert response.status_code == 404
        # Ensure no stack trace in response
        text = response.text
        assert "Traceback" not in text
        assert "File " not in text


class TestSecurityConstants:
    """Test security configuration constants."""

    def test_api_key_minimum_length_enforced(self) -> None:
        """API key must be at least 32 characters (per config validator)."""
        from app.core.config import Settings
        from pydantic import ValidationError

        with pytest.raises((ValidationError, Exception)):
            Settings(
                AI_SERVICE_API_KEY="short",
                DATABASE_URL="postgresql://test:test@localhost/test",
            )
