import { NextResponse } from 'next/server';

export function ok(data, status = 200) {
  return NextResponse.json({ result: true, data }, { status });
}

export function fail(message, status = 400) {
  return NextResponse.json({ result: false, message }, { status });
}

// Wraps a Route Handler body so every endpoint turns a thrown Error into a
// consistent { result: false, message } response instead of a raw 500,
// matching how the admin UI already expects action failures to look.
export function handle(fn) {
  return async (request, context) => {
    try {
      return await fn(request, context);
    } catch (error) {
      const status = error.message === 'Not authorized.' ? 401 : 400;
      return fail(error.message || 'Something went wrong.', status);
    }
  };
}
