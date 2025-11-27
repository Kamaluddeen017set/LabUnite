'use client';
import TestInput from './TestInput';
import '../styles/AddNewTest.css';

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import axiosInstance from '../axiosInstance';
import { useParams } from 'next/navigation';

export default function AddNewTest({ setModel, currentUser }) {
  const { id } = useParams();
  const [labTestList, setLabTestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTests, setSelectedTests] = useState([]);

  const handleOnSubmit = async e => {
    e.preventDefault();
    console.log('>>>>', selectedTests);
    const newTestData = {
      tests: selectedTests.map(t => ({
        category: t.category,
        testName: t.label,
        testType: t.testType,
        singleUnit: t.singleUnit,
        singleReferenceRange: t.singleReferenceRange,
        parameters: t.parameters,
        testTempleteId: t._id,
        updatedAt: Date.now(),
      })),
      patientId: id,
      labId: currentUser.labId._id,
      staffId: currentUser._id,
    };

    try {
      const res = await axiosInstance.post('/tests/', newTestData);
      alert('Test Added SUccessfully');
      setModel(false);
      window.location.href = `/patient/${newTestData.patientId}`;
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to register');
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      const labId = currentUser.labId._id;
      try {
        const res = await axiosInstance.get(`/labs/${labId}/test-templetes`);
        setLabTestList(res.data.testTempletes);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);
  console.log('>>>>>>>>>>', labTestList);
  const testOptions = labTestList.reduce((acc, item) => {
    const category = item.category;

    let group = acc.find(g => g.category === category);
    if (!group) {
      group = { category, tests: [] };
      acc.push(group);
    }

    group.tests.push({
      value: item._id, // required
      label: item.testName, // required
      testType: item.testType,
      parameters: item.parameters || [],
      singleUnit: item.singleUnit,
      singleReferenceRange: item.singleReferenceRange,
    });

    return acc;
  }, []);

  if (loading) return <p> loading...</p>;

  console.log(labTestList);
  console.log(testOptions);
  return (
    <div className="add-new-test">
      <div className="create-menu">
        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setModel(false)} />
      </div>
      <h2>Add New Tests</h2>
      <form onSubmit={handleOnSubmit}>
        <div className="selected-tests">
          {selectedTests.map(t => (
            <div key={t.value} className="chip">
              {t.label}
              <span
                className="remove-chip"
                onClick={() =>
                  setSelectedTests(prev =>
                    prev.filter(x => x.value !== t.value)
                  )
                }
              >
                {<FontAwesomeIcon icon={faTimesCircle} />}
              </span>
            </div>
          ))}
        </div>
        <label className="input_label" htmlFor="name">
          Test Requested
        </label>
        <TestInput
          groups={testOptions}
          onSelect={test =>
            setSelectedTests(prev => {
              if (prev.some(t => t.value === test.value)) return prev;

              return [...prev, test];
            })
          }
        />
        <br />
        <button className="view-btn">Submit</button>
      </form>
    </div>
  );
}
