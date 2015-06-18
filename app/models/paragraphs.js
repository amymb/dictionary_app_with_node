
var Paragraph = sequelize.define('Paragraph', {
    paragraphtext: Sequelize.STRING,
    bookid: Sequelize.INTEGER,
    votes: Sequelize.INTEGER,
  }),

  Paragraph.belongsTo(Book, {
    foreignKey: 'bookid',
    constraints: false
  });
