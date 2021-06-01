const db = require("../models");
const Tutorial = db.tutorial;
const Tag = db.tag;

exports.create = (tag) => {
    return Tag.create({
      name: tag.name,
    })
      .then((tag) => {
        console.log(">> Created Tag: " + JSON.stringify(tag, null, 2));
        return tag;
      })
      .catch((err) => {
        console.log(">> Error while creating Tag: ", err);
      });
  };

  exports.findAll = () => {
    return Tag.findAll({
      include: [
        {
          model: Tutorial,
          as: "tutorials",
          attributes: ["id", "title", "description"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((tags) => {
        return tags;
      })
      .catch((err) => {
        console.log(">> Error while retrieving Tags: ", err);
      });
  };

  exports.findById = (id) => {
    return Tag.findByPk(id, {
      include: [
        {
          model: Tutorial,
          as: "tutorials",
          attributes: ["id", "title", "description"],
          through: {
            attributes: [],
          }
        },
      ],
    })
      .then((tag) => {
        return tag;
      })
      .catch((err) => {
        console.log(">> Error while finding Tag: ", err);
      });
  };

  exports.addTutorial = (tagId, tutorialId) => {
    return Tag.findByPk(tagId)
      .then((tag) => {
        if (!tag) {
          console.log("Tag not found!");
          return null;
        }
        return Tutorial.findByPk(tutorialId).then((tutorial) => {
          if (!tutorial) {
            console.log("Tutorial not found!");
            return null;
          }
  
          tag.addTutorial(tutorial);
          console.log(`>> added Tutorial id=${tutorial.id} to Tag id=${tag.id}`);
          return tag;
        });
      })
      .catch((err) => {
        console.log(">> Error while adding Tutorial to Tag: ", err);
      });
  };