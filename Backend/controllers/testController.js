import Test from "../models/Test.js";
import Patient from "../models/Patient.js";
import Lab from "../models/Lab.js";
import { logActivity } from "../middleware/activityLogger.js";

///create New Test
export const createNewTest = async (req, res) => {
  try {
    const { tests, patientId, labId, staffId } = req.body;
    console.log(req.body);
    if (!tests || tests.length === 0) {
      return res.status(400).json({ message: "No test selected" });
    }

    const lab = await Lab.findById(labId);
    const year = new Date().getFullYear();
    const creacteTests = [];

    for (const t of tests) {
      lab.testCounter += 1;
      const sequence = String(lab.testCounter).padStart(4, "0");
      const testId = `${lab.code}-T-${year}-${sequence}`;
      const newTest = await Test.create({
        testName: t.testName,
        testType: t.testType,
        category: t.category,
        singleUnit: t.singleUnit,
        singleReferenceRange: t.singleReferenceRange,
        parameters: t.parameters,
        updatedAt: t.updatedAt,
        testTempleteId: t.testTempleteId,
        patientId,
        labId,
        testId,
        staffId,
      });

      creacteTests.push(newTest);

      await Patient.findByIdAndUpdate(patientId, {
        $push: { tests: newTest._id },
      });
      await logActivity(
        staffId,
        labId,
        `Added ${t.testName} Request `,
        `Test Id ${testId}`,
        req.ip
      );
    }
    await lab.save();

    res.json(creacteTests);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to Creacte Tests" });
  }
};

export const getSingleTest = async (req, res) => {
  try {
    const test = await Test.findOne({
      _id: req.params.id,
      labId: req.params.labId,
    })
      .populate("patientId", "name age gender patientId phone address")
      .populate("labId", "name")
      .populate("staffId", "name role");

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({ message: "Test fetched successfully", data: test });
  } catch (error) {
    console.error("Error fetching  single test:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//update test
export const updateTest = async (req, res) => {
  try {
    const updatedData = req.body;

    const updated = await Test.findOneAndUpdate(
      {
        _id: req.params.id,
        labId: req.params.labId,
      },
      updatedData,
      {
        new: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Test not found" });
    }

    res
      .status(200)
      .json({ message: "Test updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating templete:", error);
    res.status(500).json({ message: "Server error" });
  }
};

///Deleting Test
export const deleteTest = async (req, res) => {
  try {
    const deleted = await Test.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "templete not found" });
    }

    res.status(200).json({ message: "Test  deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting test:", error);
    res.status(500).json({ message: "Server  error" });
  }
};
