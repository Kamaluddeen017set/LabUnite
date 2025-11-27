import Lab from "../models/Lab.js";
import TestTemplete from "../models/TestTemplete.js";

///create tempelete
export const creacteTestTemplete = async (req, res) => {
  try {
    const {
      testName,
      testType,
      parameters,
      labId,
      staffId,
      category,
      singleUnit,
      singleReferenceRange,
    } = req.body;

    if (!["single", "complex"].includes(testType)) {
      return res.status(400).json({ message: "Ivalid testType" });
    }
    const newTemplete = new TestTemplete({
      category,
      testName,
      testType,
      parameters,
      labId,
      staffId,
      singleUnit,
      singleReferenceRange,
    });

    await newTemplete.save();
    ////
    //  await Patient.findByIdAndUpdate(patientId, {
    //         $push: { tests: newTest._id },
    //       });
    //
    //     await lab.save();
    ///
    await Lab.findByIdAndUpdate(labId, {
      $push: { testTempletes: newTemplete._id },
    });

    res.status(201).json({
      message: "Test templete created successfully",
      data: newTemplete,
    });
  } catch (error) {
    console.error("Error creating templete:", error);
    res.status(500).json({ message: "Server error" });
  }
};

///gett all templete
export const getAllTestTemplete = async (req, res) => {
  try {
    const tempeletes = await TestTemplete.find()
      .sort({ category: 1 })
      .populate("labId", "name")
      .populate("staffId", "name role");

    res
      .status(200)
      .json({ message: "Templates fetched successfully", data: tempeletes });
  } catch (error) {
    console.error("Error fetching templetes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//get single templete
export const getSingleTestTemplete = async (req, res) => {
  try {
    const tempelete = await TestTemplete.findOne({
      _id: req.params.id,
      labId: req.params.labId,
    })
      .populate("labId", "name")
      .populate("staffId", "name role");

    if (!tempelete) {
      return res.status(404).json({ message: "Templete not found" });
    }

    res
      .status(200)
      .json({ message: "Templete fetched successfully", data: tempelete });
  } catch (error) {
    console.error("Error fetching  single templetes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//update templete
export const updateTestTemplete = async (req, res) => {
  try {
    const updatedData = req.body;

    const updated = await TestTemplete.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Templete not found" });
    }

    res
      .status(200)
      .json({ message: "Temlete updated successfully", data: updated });
  } catch (error) {
    console.error("Error updating templete:", error);
    res.status(500).json({ message: "Server error" });
  }
};

///Deleting Templet
export const deleteTestTemplete = async (req, res) => {
  try {
    const deleted = await TestTemplete.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "templete not found" });
    }

    res.status(200).json({ message: "Templete  deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting Templete:", error);
    res.status(500).json({ message: "Server  error" });
  }
};
