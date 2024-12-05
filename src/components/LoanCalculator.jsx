import React, { useState } from 'react';
import axios from 'axios';

const LoanCalculator = () => {
  const [principal, setPrincipal] = useState(10000000);
  const [annualInterestRate, setAnnualInterestRate] = useState(9);
  const [loanTenureMonths, setLoanTenureMonths] = useState(240);
  const [result, setResult] = useState(null);

  const calculateLoan = async () => {
    try {
      const response = await axios.post('http://localhost:5042/api/LoanCalculator/calculate', {
        principal,
        annualInterestRate,
        loanTenureMonths,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error calculating loan:", error);
    }
  };

  return (
    <div className='bg-blue-100 h-screen pt-10'>
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Loan Calculator</h2>

      {/* Principal Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Principal: ₹{principal.toLocaleString()}
        </label>
        <input
          type="range"
          min="100000"
          max="10000000"
          step="100000"
          value={principal}
          onChange={(e) => setPrincipal(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Interest Rate Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Annual Interest Rate: {annualInterestRate}%
        </label>
        <input
          type="range"
          min="1"
          max="20"
          step="0.1"
          value={annualInterestRate}
          onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Loan Tenure Slider */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Loan Tenure: {loanTenureMonths} months
        </label>
        <input
          type="range"
          min="12"
          max="360"
          step="12"
          value={loanTenureMonths}
          onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateLoan}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
      >
        Calculate
      </button>

      {/* Result Display */}
      {result && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="text-xl font-semibold text-center">Calculation Results</h3>
          <p className="mt-2">Monthly Payment: ₹{result.monthlyPayment.toFixed(2)}</p>
          <p>Total Payment: ₹{result.totalPayment.toFixed(2)}</p>
          <p>Total Interest: ₹{result.totalInterest.toFixed(2)}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default LoanCalculator;
