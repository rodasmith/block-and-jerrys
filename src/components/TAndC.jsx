import React from 'react';
import Back from './back';

const TAndC = () => (
	<div style={{ color: 'white', padding: '2em', background: 'rgba(0, 0, 0, 0.4)' }}>
    <Back />
    
		<h1 style={{ marginTop: '2em' }} id="termsandconditionsfordonutshop">Terms and Conditions for The Donut Shop.</h1>
		
		<h2 id="technology">Technology</h2>
		
		<p>Although the products we are selling here are real, this store is for testing and demonstration purposes only. The Lightning Network Daemon, which The Donut Shop uses to generate and accept transactions, is still very new and contains known and unknown bugs. Additionally, the Lightning Labs is neither affiliated nor supports the existence of this store.</p>
		
		<p>YOU MAY LOSE FUNDS!</p>
		
		<h2 id="donut">Donut</h2>
		
		<h2 id="legalities">Legalities</h2>
		
		<p>These terms and conditions are subject to change.</p>
		
		<p>I have read and agree to the terms and conditions.</p>
	</div>
);
export default TAndC;
