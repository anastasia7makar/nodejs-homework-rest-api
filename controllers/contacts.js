const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../helpers");
const { CustomErrors } = require("../helpers/customErrors");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const searchParams = {
    owner,
  };

  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  if (typeof favorite === "undefined") {
    delete searchParams.favorite;
  } else {
    searchParams.favorite = favorite;
  }

  const result = await Contact.find(searchParams, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "email");

  res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw CustomErrors.NotFound();
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });

  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body);
  if (!result) {
    throw CustomErrors.NotFound();
  }
  res.status(200).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw CustomErrors.NotFound();
  }
  res.status(200).json({
    message: "contact deleted",
  });
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw CustomErrors.NotFound();
  }
  res.status(200).json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  removeContact: ctrlWrapper(removeContact),
};
