import React from "react";
import ReactPasswordStrength from "react-password-strength";

/**
 * Describe the state of App component
 */
interface IAppState {
  passLength: number;
}

/**
 * Default Props for all inputs
 */
const INPUT_PROPS = {
  placeholder: "Try a password...",
  autoFocus: true,
  className: "another-input-prop-class-name"
};

export default class App extends React.Component<any, IAppState> {
  private reactPasswordStrengthRef: typeof ReactPasswordStrength; // Reference to ReactPasswordStrength component
  state: IAppState; // State of App component

  constructor(props: any) {
    super(props);
    // Init our state
    this.state = { passLength: 0 };
  }

  // Handle changes in ReactPasswordStrength inputs to update our state
  changeCallback = (state: { password: { length: number } }) =>
    this.setState({ passLength: state.password.length });

  // Clear the input of ReactPasswordStrength component
  clear = () => this.reactPasswordStrengthRef.clear();

  render() {
    return (
      <div id="example">
        <h1>React Password Strength Tool</h1>
        <p>
          Powered by{" "}
          <a
            href="https://github.com/dropbox/zxcvbn"
            target="_blank"
            rel="noopener noreferrer"
          >
            zxcvbn
          </a>
        </p>

        <ReactPasswordStrength
          ref={(ref: any) => (this.reactPasswordStrengthRef = ref)}
          minLength={6}
          INPUT_PROPS={{ ...INPUT_PROPS, id: "inputPassword1" }}
          changeCallback={this.changeCallback}
        />

        <button onClick={this.clear} disabled={this.state.passLength === 0}>
          Clear
        </button>

        <h3>Password Input with Default Value</h3>

        <ReactPasswordStrength
          minLength={6}
          INPUT_PROPS={{ ...INPUT_PROPS, id: "inputPassword2" }}
          defaultValue="defaultValue"
        />

        <h3>Password Input with Custom Styling</h3>

        <ReactPasswordStrength
          className="CustomInput"
          minLength={6}
          INPUT_PROPS={{ ...INPUT_PROPS, id: "inputPassword3" }}
        />
      </div>
    );
  }
}
