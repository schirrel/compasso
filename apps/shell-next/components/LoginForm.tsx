'use client';
import { useState, type SubmitEvent } from "react";

export default function LoginForm() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    setError('');
    event.preventDefault();
    setLoading(true)
    try{
    const result = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({email, password})
    });
    const response = await result.json();

      if (result.ok) {
        return setSuccess(true)
      } else {
        setError(response.message ?? 'Something went wrong!')
      }
  } catch(e) {
      console.log(e)
      setError('Something went wrong!')

  } finally {
      setLoading(false)
  }

  }
  
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-black-200 gap-4">
      <h1 className="font-bold text-2xl">
        Compasso <cp-badge>Beta</cp-badge>
      </h1>
      <cp-card>
        <h2 className="font-bold text-md">Welcome Back</h2>
        <form className="flex min-w-[400px] p-4 flex-col flex-1 items-center justify-center font-sans" onSubmit={handleSubmit}>
          { success ? <cp-badge tone="success" >Logged in succesfully,  you will be redirected!</cp-badge> : null }
          { error ?  <cp-badge tone="danger" >{error}</cp-badge >   : null}
          <span className={`${!loading? 'hidden' : ''} flex flex-col flex-1 items-center justify-center absolute flex w-full h-full bg-white-50 z-10 text-black font-bold text-2xl`}>Loading</span>  
          <div className="w-full">
            <cp-input
              id="email-input"
              type="email"
              label="Login"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
              disabled={loading}
            ></cp-input>
          </div>
          <div className="w-full">
            <cp-input
              disabled={loading}
              id="password-input"
              type="password"
              label="Password"
              required
              value={password}
              onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            ></cp-input>
          </div>
          <div className="flex flex-col w-full max-w-3xl flex-col items-center justify-between">
            <cp-button type="button" variant="ghost" size="sm"  disabled={loading}>
              {" "}
              Forget Password{" "}
            </cp-button>
            <cp-button type="submit"  disabled={loading}> Login </cp-button>
          </div>
        </form>
        <cp-button type="button" variant="ghost" size="sm"  disabled={loading}>
            Register{" "}
        </cp-button>
      </cp-card>
    </div>
  );
}
