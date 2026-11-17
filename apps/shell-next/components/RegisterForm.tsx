"use client";
import { useMemo, useReducer, type SubmitEvent, act } from "react";
import "./RegisterForm.css";

const formInitialState = {
  email: "",
  password: "",
  loading: false,
  error: "",
  success: false,
  validations: [
    {
      id: "minLength6",
      validation: "At least 6 characters.",
      regex: /.{6,}/,
      valid: false,
    },
    {
      id: "oneNumber",
      validation: "One number.",
      regex: /\d{1,}/,
      valid: false,
    },
    {
      id: "oneSpecialChar",
      validation: "One special characters.",
      regex: /[!@#$%^&*()\-_=+{};:,<.>]/,
      valid: false,
    },
    {
      id: "oneLowercase",
      validation: "One lowercase.",
      regex: /[a-z]{1,}/,
      valid: false,
    },
    {
      id: "oneUppercase",
      validation: "One uppercase.",
      regex: /[A-Z]{1,}/,
      valid: false,
    },
  ],
};

type RegisterFormType = typeof formInitialState;

const formReducer = (
  state: RegisterFormType,
  action: { field: keyof RegisterFormType; value: string | boolean },
) => {
  (state as Record<string, unknown>)[action.field] = action.value;
  if (action.field === "password") {
    state.validations.forEach((validation) => {
      validation.valid = validation.regex.test(state.password);
    });
  }
  return {...state};
};

export default function RegisterForm() {
  const [state, dispatch] = useReducer(formReducer, formInitialState);

  const formValid = useMemo(()=> {
    return Boolean(state.email && state.password && !state.validations.some((v)=> !v.valid))
}, [state])

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formValid) {
      return;
    }
    dispatch({ field: "error", value: "" });
    dispatch({ field: "loading", value: true });

    try {
      const formData = { email: state.email, password: state.password };
      const result = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      const response = await result.json();

      if (result.ok) {
        return dispatch({ field: "success", value: true });
      } else {
        dispatch({
          field: "error",
          value: response.message ?? "Something went wrong!",
        });
      }
    } catch (e) {
      dispatch({
        field: "error",
        value: (e as Error).message ?? "Something went wrong!",
      });
    } finally {
      dispatch({ field: "loading", value: false });
    }
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-black-200 gap-4">
      <h1 className="font-bold text-2xl">
        Compasso <cp-badge>Beta</cp-badge>
      </h1>
      <cp-card>
        <h2 className="font-bold text-md">Nice to meet you!</h2>
        <form
          className="flex min-w-[200px] p-4 flex-col flex-1 items-center justify-center font-sans"
          onSubmit={handleSubmit}
        >
          {state.success ? (
            <cp-badge tone="success">
              You are in! Registration succesfully, proceed to 
        <cp-button link={true} variant="ghost" size="sm" href="/login">
          Login{" "}
        </cp-button>!
            </cp-badge>
          ) : null}
          {state.error ? <cp-badge tone="danger">{state.error}</cp-badge> : null}
          <span
            className={`${!state.loading ? "hidden" : ""} flex flex-col flex-1 items-center justify-center absolute flex w-full h-full bg-white-50 z-10 text-black font-bold text-2xl`}
          >
            Loading
          </span>
          <div className="w-full">
            <cp-input
              id="email-input"
              type="email"
              label="Login"
              placeholder="your@email.com"
              required
              value={state.email}
              onChange={(e) =>
                dispatch({
                  field: "email",
                  value: (e.target as HTMLInputElement).value,
                })
              }
              disabled={state.loading}
            ></cp-input>
          </div>
          <div className="w-full">
            <cp-input
              disabled={state.loading}
              id="password-input"
              type="password"
              label="Password"
              required
              value={state.password}
              onChange={(e) =>
                dispatch({
                  field: "password",
                  value: (e.target as HTMLInputElement).value,
                })
              }
            ></cp-input>
            <div className="password-validations">
              {state.validations.map((validation) => {
                return (
                  <label
                    className="password-validation"
                    htmlFor={validation.id}
                    key={validation.id}
                  >
                    <input
                      checked={validation.valid}
                      type="checkbox"
                      id={validation.id}
                      name={validation.id}
                      disabled
                    />{" "}
                    {validation.validation}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col w-full max-w-3xl flex-col items-center justify-between py-4">
            <cp-button type="submit" disabled={state.loading || !formValid}>
              {" "}
              Register{" "}
            </cp-button>
          </div>
        </form>
        <cp-button type="button" variant="ghost" size="sm" disabled={state.loading}>
          Login{" "}
        </cp-button>
      </cp-card>
    </div>
  );
}
