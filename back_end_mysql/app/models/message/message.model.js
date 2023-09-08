module.exports = (sequalize, Sequalize) => {
  const Message = sequalize.define("message", {
    message: {
      type: Sequalize.STRING,
      allowNull: false,
    },
    room: {
      type: Sequalize.STRING,
      allowNull: false,
    },
  });
  return Message;
};
