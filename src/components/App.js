import React from 'react'
import { AuthProvider } from '../Context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';

function App() {
	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route exact path='/' element={<PrivateRoute>
						<Dashboard />
					</PrivateRoute>} />
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />
				</Routes>
			</AuthProvider>
		</Router>
	);
}

export default App;
