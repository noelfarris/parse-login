var React = require('react');

module.exports = React.createClass({
	getInitialState: function() {
		return {
		error: null
		};
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (
				<p className="red">{this.state.error}</p>
			);
		}
		return (
			<div className="container">
				<div className="row">
				<form className="col s12" onSubmit={this.onRegister} >
					<h1>Login</h1>
					{errorElement}
				<div>
					<label>Username</label>
					<input type="text" ref="username" />
				</div>
				<div>
					<label>Password</label>
					<input type="text" ref="password" />
				</div>
				<button>Log In</button>
				</form>
				</div>
			</div>
		);
	},
	onRegister: function(e) {
		e.preventDefault();
		var userName = this.refs.username.getDOMNode().value;
		var passWord = this.refs.password.getDOMNode().value;

		var User= new Parse.User();

		Parse.User.logIn(userName, passWord, {
			success: (User) => {
				console.log('success', User);
				this.setState({
					error: null
				});
				this.props.router.navigate('dashboard', {trigger: true});
			},
			error: (User, error) => {
				this.setState({
					error: error.message
				});
			}
		})
	}
});