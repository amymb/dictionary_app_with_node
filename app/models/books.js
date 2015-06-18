
var Book =  sequelize.define('Book', {
    title: Sequelize.STRING,
    text: Sequelize.STRING,
    Year: Sequelize.STRING,
    Finished:  D.INTEGER,
  });

Book.hasMany(paragraphs, {
    foreignKey: 'bookid',
    constraints: false
  });
