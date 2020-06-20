import React, { PureComponent } from "react";
import DatePicker from "date-picker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      users: ["test"],
    });
  }

  onChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    console.log(exercise);
    window.location = "/";
  }
  render() {
    return (
      <div>
        <p> you are at the Exercise create page </p>
      </div>
    );
  }
}
