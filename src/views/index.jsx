var React = require('react');
var DefaultLayout = require('./layouts/dashboard');

function HelloMessage(props) {
  return (
    <DefaultLayout title={props.title}>
      <div>Hello {props.name}</div>
    </DefaultLayout>
  );
}

module.exports = HelloMessage;