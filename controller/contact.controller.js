import Contact from '../models/Contact.js';

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({});

    return res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      {},
      { $set: req.body },
      {
        new: true,
        runValidators: true,
        upsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedContact,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
