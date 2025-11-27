'use client';
import { useEffect, useState } from 'react';
import TestInput from './TestInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../styles/ChangeTest.css';
import axiosInstance from '../axiosInstance';
export default function ChangeTest({
  currentUser,
  testOptions,
  setModel,
  testId,
  setNewTestResult,
}) {
  const [currentuCreatedTest, setCurrentuCreatedTest] = useState([]);
  console.log(testId);
  const handleChangeTest = async e => {
    e.preventDefault();

    try {
      const labId = currentUser.labId._id;
      const Newtest = {
        testName: currentuCreatedTest.label,
        category: currentuCreatedTest.category,
        method: currentuCreatedTest.method || '',
        testType: currentuCreatedTest.testType,
        sampleType: currentuCreatedTest.sampleType || '',
        singleUnit: currentuCreatedTest.singleUnit,
        singleReferenceRange: currentuCreatedTest.singleReferenceRange,
        singleResult: '',
        parameters: currentuCreatedTest.parameters?.map(parameter => ({
          parameter: parameter.parameter,
          referenceRange: parameter.referenceRange,
          unit: parameter.unit,
          result: '',
        })),

        status: 'pending',
        testTempleteId: currentuCreatedTest._id,
        staffId: currentUser._id,
        createdAt: Date.now(),
      };
      console.log('here', Newtest);

      const res = await axiosInstance.put(`/tests/${labId}/${testId}`, Newtest);
      alert(res.data.message);
      setNewTestResult(res.data.data);
      console.log(res.data);
      window.location.href = `/test/${testId}`;
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to register');
    }
  };

  return (
    <div className="change-test">
      <div className="add-new-test">
        <div className="create-menu">
          <FontAwesomeIcon
            icon={faTimesCircle}
            onClick={() => setModel(false)}
          />
        </div>
        <form onSubmit={handleChangeTest}>
          <h2 style={{ textAlign: 'center' }}>Change Test</h2>
          <label className="input_label" htmlFor="name">
            Test Request
          </label>
          <TestInput
            setQ={true}
            groups={testOptions}
            onSelect={test => setCurrentuCreatedTest(test)}
          />
          <button className="btn">Submit Change</button>
        </form>
      </div>
    </div>
  );
}
