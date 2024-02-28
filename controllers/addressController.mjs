import Address from "../models/Address.mjs";

const getUserAddresses = async (req, res) => {
    const addresses = await Address.findAll({ where: { userId: req.user.id } });
    res.json({ addresses });
};

const postUserAddress = async (req, res) => {
    const { latitude, longitude, description } = req.body;

    const address = await Address.create({
        description,
        latitude,
        longitude,
        userId: req.user.id,
    });

    res.status(201).json({ message: "address added" });
};

const deleteUserAddress = async (req, res) => {
    const id = req.params.id;

    const address = await Address.findOne({ where: { id, userId: req.user.id } });

    if (!address) {
        return res.status(400).json({ message: "wrong address id" });
    }

    await address.destroy();
    return res.json({ message: "address deleted" });
};

export { postUserAddress, deleteUserAddress, getUserAddresses };
