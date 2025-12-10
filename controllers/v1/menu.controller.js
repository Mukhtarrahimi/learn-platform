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

// Update Menu
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, link, order, parentId, isActive } = req.body;
    const menu = await Menu.findByIdAndUpdate(
      id,
      { title, link, order, parentId, isActive },
      { new: true }
    );
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'menu not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'menu updated successfully',
      menu,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error updating menu',
      error: err.message,
    });
  }
};

// delete menu
const deleteMenu = async (req, res) => {
  try {
    const id = req.params.id;
    const menu = await Menu.findByIdAndDelete(id);
    if (!menu) {
      return res.status(404).json({
        success: false,
        message: 'menu not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'menu deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'error deleting menu',
      error: err.message,
    });
  }
};

const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find({ isActive: true }).sort({ order: 1 }).lean();

    const menuMap = {};
    menus.forEach((menu) => {
      menu.subMenus = [];
      menuMap[String(menu._id)] = menu;
    });

    const topMenus = [];

    menus.forEach((menu) => {
      if (menu.parentId) {
        const parent = menuMap[String(menu.parentId)];
        if (parent) {
          parent.subMenus.push(menu);
        }
      } else {
        topMenus.push(menu);
      }
    });

    res.status(200).json({
      success: true,
      message: 'Menus fetched successfully',
      menus: topMenus,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error fetching menus',
      error: err.message,
    });
  }
};

module.exports = {
  createMenu,
  updateMenu,
  deleteMenu,
  getMenus,
};
