const Menu = require('../../models/menu.model');

const createMenu = async (req, res) => {
  try {
    const { title, link, order, parentId, isActive } = req.body;
    const menuExist = await Menu.findOne({ title, parentId: parentId || null });
    if (menuExist) {
      return res.status(400).json({
        success: false,
        message: 'menu already exists',
      });
    }
    const menu = await Menu.create({
      title,
      link,
      order,
      parentId,
      isActive,
    });
    res.status(201).json({
      success: true,
      message: 'menu created successfully',
      menu,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error creating menu',
      error: err.message,
    });
  }
};

module.exports = {
  createMenu,
};
