# Coding Preferences

## General Interactions

- If the user asks a question, respond by providing an answer, information, or a plan; don't just start implementing.
- Start implementing only if the user gives you a clear instruction to do something.
- If the user proposes an approach, think about whether that is the best approach. Push back if it isn't. Don't be be overly agreeable.

## Development Plans

- Provide a Development plan if users asks for a 'dev plan' or 'development plan'.
- Provide a linear plan for development
- Provide sufficient detail so a senior developer can understand how the codebase will change
- List files that will be created and files that will change or be deleted
- Write out the names of key methods and types that will change
- Explain the changes you will make
- Do not write out full code
- When implementing, do not create/change/delete files not mentioned in the Development Plan

## Code Organization

- Separation of concerns
- Reusable components in their own modules
- Clean import structure
- Loose coupling of code through dependency injection
- Don't ever put comments in code
- Organize by subject domain not code type (e.g., todo/types.ts todo/components; not types/todo.ts components/todo/)

## Typescript

- Read the tsconfig.json file at the root of the project at the start of every session
- Explicitly type the returns of functions, unless the type is unusually complex
- Always assume array elements can be undefined if not checked (noUncheckedArrayAccess)
- Always use `import type` for importing types (enforced by ESLint)
- Never use classes or inheritance; instead use factory functions and composition
- Avoid excessive nesting
- Avoid defining functions inside other functions' scopes
- Always used named exports and imports; never write default exports
- Use ReturnType<typeof function> for extracting types from functions
- Provide precise typings for async operations with proper error handling
- Don't use 'any'

## Testing

- Tests in `__tests__` directory next to module being tested
- Test modules named with .test.ts(x)
- Don't use "should" in test names
- Only have a top level describe block if there is going to be more than one top level describe block
- Unit tests should rarely use mocks; needing mocks is a sign of bad code architecture
- Make Jest available globally in test setup files instead of importing in each test
- Use proper type assertions in conditional tests to narrow types safely
- Type check tests before running them
- When fixing broken tests, always check the implementation first to determine if the problem is the implementation

## Additional Guidance
