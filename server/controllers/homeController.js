const homeContoller = async (req, res) => {

  res.status(200).json({
    status: 200,
    message: 'Successfully load landing page!',
    data: {
      keyword: 'siphoon-note',
      userList: ['Franklin D. Roosevelt', 'Winston Churchill', 'Charles de Gaulle'],
      publicEssayList: ['simply', 'text', 'printing'],
    },
  });
};

module.exports = homeContoller;