import { useEffect, useState } from 'react';

const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
      {/* Headings */}
      <h1>Main Heading</h1>
      <h2>Subheading</h2>
      <img src="example.jpg" alt="Example" />
      {/* Regular buttons */}
      <button>Click me</button>
      <button>Submit</button>
      <button>Cancel</button>
      {/* conditional error button to demo queryByRole*/}
      {showError && <button>Error</button>}
      {/* async button to demo findByRole */}
      {showAsyncButton && <button>Async Button</button>}
    </div>
  );
};
export default Sandbox;
