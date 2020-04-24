import React from 'react';

function App() {
  return (
    <div>
      <h1>React Ref Examples</h1>
      <hr />

      <h2>Component With Ref with Instance Variable</h2>
      <ComponentWithRefInstanceVariable />

      <hr />

      <h2>Component With Ref with DOM API</h2>
      <ComponentWithDomApi label="Label" value="Value" isFocus />

      <hr />

      <h2>Component With Ref Read</h2>
      <ComponentWithRefRead />

      <hr />

      <h2>Component With Ref Read & Ref Write</h2>
      <ComponentWithRefReadWrite />

      <hr />

      <h2>Component With Ref Read & State Write</h2>
      <ComponentWithRefReadStateWrite />

      <hr />

      <h2>Component With Ref for imperative State</h2>
      <ComponentWithImperativeRefState />
    </div>
  );
}

function ComponentWithRefInstanceVariable() {
  const [count, setCount] = React.useState(0);

  function onClick() {
    setCount(count + 1);
  }

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      console.log(
        `
          I am a useEffect hook's logic
          which only runs after a component's
          re-render.
        `
      );
    }
  });

  return (
    <div>
      <p>{count}</p>

      <button type="button" onClick={onClick}>
        Increase
      </button>

      {/*
        Only works because setCount triggers a re-render.
        Just changing the ref's current value doesn't trigger a re-render.
      */}
      <p>{isFirstRender.current ? 'First render.' : 'Re-render.'}</p>
    </div>
  );
}

function ComponentWithDomApi({ label, value, isFocus }) {
  const ref = React.useRef();

  React.useEffect(() => {
    if (isFocus) {
      // ref with DOM API usage
      ref.current.focus();
    }
  }, [isFocus]);

  return (
    <label>
      {label}: <input type="text" value={value} ref={ref} />
    </label>
  );
}

function ComponentWithRefRead() {
  const [text, setText] = React.useState('Some text ...');

  function handleOnChange(event) {
    setText(event.target.value);
  }

  // ** 1) useRef usage only for initial render ** //

  // const ref = React.useRef();

  // React.useEffect(() => {
  //   const { width } = ref.current.getBoundingClientRect();

  //   document.title = `Width:${width}`;
  // }, []);

  // ** 2) useRef usage for initial and update render ** //

  // const ref = React.useRef();

  // React.useEffect(() => {
  //   const { width } = ref.current.getBoundingClientRect();

  //   document.title = `Width:${width}`;
  // }, [text]);

  // ** 3) callback ref usage for initial render ** //

  // const ref = React.useCallback((node) => {
  //   if (!node) return;

  //   const { width } = node.getBoundingClientRect();

  //   document.title = `Width:${width}`;
  // }, []);

  // ** 4) callback ref usage for initial and update render ** //
  // ** use 5) instead ** //

  // const ref = React.useCallback((node) => {
  //   if (!node) return;

  //   const { width } = node.getBoundingClientRect();

  //   document.title = `Width:${width}`;
  // }, [text]);

  // ** 5) callback ref usage for initial and update render ** //

  const ref = (node) => {
    if (!node) return;

    const { width } = node.getBoundingClientRect();

    document.title = `Width:${width}`;
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}

function ComponentWithRefReadWrite() {
  const [text, setText] = React.useState('Some text ...');

  function handleOnChange(event) {
    setText(event.target.value);
  }

  const ref = (node) => {
    if (!node) return;

    const { width } = node.getBoundingClientRect();

    if (width >= 150) {
      node.style.color = 'red';
    } else {
      node.style.color = 'blue';
    }
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref}>{text}</span>
      </div>
    </div>
  );
}

function ComponentWithRefReadStateWrite() {
  const [text, setText] = React.useState('Some text ...');

  function handleOnChange(event) {
    setText(event.target.value);
  }

  const [isLarge, setIsLarge] = React.useState(false);

  const ref = (node) => {
    if (!node) return;

    const { width } = node.getBoundingClientRect();

    const value = width >= 150;

    if (value !== isLarge) {
      setIsLarge(value);
    }
  };

  const style = isLarge ? { color: 'red' } : { color: 'blue' };

  return (
    <div>
      <input type="text" value={text} onChange={handleOnChange} />
      <div>
        <span ref={ref} style={style}>
          {text}
        </span>
      </div>
    </div>
  );
}

function ComponentWithImperativeRefState() {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current.textContent = 0;
  }, []);

  function handleClick() {
    ref.current.textContent = Number(ref.current.textContent) + 1;
  }

  return (
    <div>
      <div>
        <span ref={ref} />
      </div>

      <button type="button" onClick={handleClick}>
        Increase
      </button>
    </div>
  );
}

export default App;
