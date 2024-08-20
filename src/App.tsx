import Editor from "./features/editor/components/editor";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.wrapper}>
      <Editor />
    </div>
  );
}

export default App;
