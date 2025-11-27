'use client';
import { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import PatientProfile from './PatientProfile';
import '../styles/TestEditPage.css';
import '../styles/TestTable.css';
import ChangeTest from './ChangeTest';
import { useApp } from '../app/context/appContext';
import { useParams } from 'next/navigation';

export default function TestEditPage({ currentUser }) {
  // const { currentUser, isLoaded, loading } = useApp();
  const [currentTest, setCurrentTest] = useState([]);
  const [labTestList, setLabTestList] = useState([]);
  const [testLoading, setTestLoading] = useState(true);
  const [openModel, setModel] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const labId = currentUser.labId._id;
  console.log(labId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`/tests/${labId}/${id}`);

        setCurrentTest(res.data.data);
        setTestLoading(false);
      } catch (err) {
        alert(err.data?.message || 'Test does not found');
        setTestLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchResults = async () => {
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

  if (loading || testLoading) return <p>Loading...</p>;

  console.log('.............', testOptions);
  console.log(currentTest._id);
  return (
    <>
      <div className="test-details">
        <PatientProfile
          patientDetails={currentTest.patientId}
          path={`/patient/${currentTest.patientId._id}`}
          navigateTo="Back to Test List"
        />
        <div className="test-section">
          <TopTestSection currentTest={currentTest} />
          <button className="view-btn" onClick={() => setModel(true)}>
            Change Test
          </button>
          <TestReportCard
            currentTest={currentTest}
            testTemplete={labTestList}
            currentUser={currentUser}
            testOptions={testOptions}
            setModel={setModel}
            openModel={openModel}
          />
        </div>
      </div>
    </>
  );
}

function TopTestSection({ currentTest }) {
  return (
    <div className="test-section-header">
      <h1>Labooratory Report Sheet</h1>
      <h3>
        Test Id: <span>{currentTest.testId}</span>
      </h3>
      <hr />
      <h2>
        <span>
          {currentTest.testType == 'complex'
            ? currentTest.testName
            : 'Test Report'}
        </span>
      </h2>
    </div>
  );
}

function TestReportCard({
  currentTest,
  testTemplete,
  currentUser,
  testOptions,
  setModel,
  openModel,
}) {
  const CurrentTestTemplete = testTemplete.filter(
    t => t.testName === currentTest.testName
  );
  return (
    <div className="test-report">
      {CurrentTestTemplete.map(templete => (
        <ReportTable
          currentTest={currentTest}
          templete={templete}
          key={templete._id}
          currentUser={currentUser}
          testOptions={testOptions}
          setModel={setModel}
          openModel={openModel}
        />
      ))}
    </div>
  );
}

function ReportTable({
  currentTest,
  templete,
  currentUser,
  testOptions,
  setModel,
  openModel,
}) {
  let parameters;
  const testId = currentTest._id;
  const labId = currentTest.labId._id;
  if (templete.testType === 'complex') {
    parameters = templete.parameters;
  } else if (templete.testType === 'single') {
    parameters = [templete];
  } else {
    console.log('Invalid Test');
    parameters = [];
  }

  const [newTestResult, setNewTestResult] = useState({
    testName: currentTest.testName,
    category: currentTest.category,
    method: currentTest.method || '',
    testType: currentTest.testType,
    sampleType: currentTest.sampleType || '',
    singleUnit: currentTest.singleUnit,
    singleReferenceRange: currentTest.singleReferenceRange,
    singleResult: currentTest.singleResult || '',
    parameters: parameters.map(parameter => ({
      parameter: parameter.parameter,
      referenceRange: parameter.referenceRange,
      unit: parameter.unit,
      result:
        currentTest.parameters?.find(t => t.parameter === parameter.parameter)
          ?.result || '',
    })),
    status: 'completed',
    testTempleteId: templete._id,
    staffId: currentUser._id,
    createdAt: Date.now(),
  });
  const handleUpload = async e => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `/tests/${labId}/${testId}`,
        newTestResult
      );
      alert('Test uploaded successfully');
      console.log(res.data);
    } catch (error) {
      alert(error.responde?.data?.message);
    }
  };

  console.log('templete', templete);
  return (
    <>
      {openModel && (
        <ChangeTest
          testId={testId}
          currentUser={currentUser}
          testOptions={testOptions}
          setModel={setModel}
          setNewTestResult={setNewTestResult}
        />
      )}
      <form onSubmit={handleUpload}>
        <table className="patient-test-table">
          <thead>
            {templete.testType == 'complex' ||
            templete.singleUnit.length > 0 ? (
              <tr>
                <th>Investications</th>
                <th>Result</th>
                <th>Normal Range</th>
                <th>Unit</th>
              </tr>
            ) : (
              <tr>
                <th>Test</th>
                <th>Result</th>
                <th>method</th>
                <th></th>
              </tr>
            )}
          </thead>

          <tbody className="table-animate">
            {parameters.map(parameter => (
              <ParameterRow
                parameter={parameter}
                key={parameter._id}
                currentTest={currentTest}
                newTestResult={newTestResult}
                setNewTestResult={setNewTestResult}
              />
            ))}
          </tbody>
        </table>
        {currentTest.status === 'pending' && (
          <button className="view-btn">Upload</button>
        )}
      </form>
    </>
  );
}
function ParameterRow({
  parameter,
  currentTest,
  newTestResult,
  setNewTestResult,
}) {
  const handleChange = e => {
    const { name, value } = e.target;
    setNewTestResult(prev => {
      if (currentTest.testType === 'complex') {
        return {
          ...prev,
          parameters: prev.parameters.map(p =>
            p.parameter === name ? { ...p, result: value } : p
          ),
        };
      } else {
        return { ...prev, singleResult: value };
      }
    });
  };
  console.log('new', newTestResult);

  return (
    <tr>
      <td>{parameter.parameter || parameter.testName}</td>
      <td>
        <textarea
          className="result-input"
          placeholder="Enter Result "
          inputMode="numeric"
          name={parameter.parameter}
          disabled={currentTest.status === 'completed' ? true : false}
          required
          value={
            currentTest.testType === 'complex'
              ? newTestResult.parameters?.find(
                  p => p.parameter === parameter.parameter
                )?.result || ''
              : newTestResult.singleResult || ''
          }
          onChange={handleChange}
        />
      </td>
      <td>
        {parameter.referenceRange ||
          parameter.singleReferenceRange ||
          parameter.method}
      </td>
      <td>{parameter.unit || parameter.singleUnit}</td>
    </tr>
  );
}
