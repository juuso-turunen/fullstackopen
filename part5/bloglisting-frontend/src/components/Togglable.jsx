import { useImperativeHandle, useState } from "react";

const Togglable = ({ children, ref, buttonLabel }) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      close() {
        setVisible(false);
      },
    };
  });

  return (
    <div>
      {!visible && (
        <div>
          <button onClick={() => setVisible(!visible)}>{buttonLabel}</button>
        </div>
      )}
      {visible && (
        <div>
          {children}
          <button onClick={() => setVisible(!visible)}>cancel</button>
        </div>
      )}
    </div>
  );
};

export default Togglable;
