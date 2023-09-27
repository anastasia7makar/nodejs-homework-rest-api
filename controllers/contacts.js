const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact:ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
