# ADR-004: LLM Provider Abstraction

**Status**: Accepted  
**Date**: 2026-09-26

## Context

LAWgic will use LLMs for document analysis, Q&A, and classification. The LLM market is rapidly evolving, with pricing and capability changing frequently. Hard-coding a single provider creates:
- Vendor lock-in
- Cost inflexibility
- Risk if a provider has outages

## Decision

Implement a **provider abstraction layer** for all LLM operations.

## Architecture

```python
class BaseLLMProvider(ABC):
    async def generate(self, request: GenerationRequest) -> GenerationResponse: ...
    async def generate_structured(self, ...) -> ...: ...

class GeminiProvider(BaseLLMProvider): ...
class OpenAIProvider(BaseLLMProvider): ...  # TODO
class AnthropicProvider(BaseLLMProvider): ...  # TODO
```

Provider is selected via `DEFAULT_LLM_PROVIDER` environment variable.

## Initial Provider: Google Gemini

**Reason**: Best cost-to-capability ratio for initial development, especially for multilingual Indian content. Gemini 1.5 Flash is significantly cheaper than GPT-4 equivalents.

## Prompt Injection Protection

Document content is passed as `DOCUMENT_DATA` message parts, clearly marked as data rather than instructions. This is enforced at the `BaseLLMProvider` level.

## Consequences

- Adding a new provider = implementing `BaseLLMProvider` interface
- Switching providers = changing one environment variable
- No application code changes required to switch providers
