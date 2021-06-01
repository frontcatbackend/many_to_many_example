const db = require("./app/models");
const TutorialController = require("./app/controllers/tutorial.controller");
const TagController = require("./app/controllers/tag.controller");

const run = async () => {
    const tut1 = await TutorialController.create({
        title: "Tut#1",
        description: "Tut#1 Description",
      });
      const tut2 = await TutorialController.create({
        title: "Tut#2",
        description: "Tut#2 Description",
      });
      
      const tut3 = await TutorialController.create({
        title: "Tut#3",
        description: "Tut#3 Description",
      });
      
      const tut4 = await TutorialController.create({
        title: "Tut#4",
        description: "Tut#4 Description",
      });

      const tag1 = await TagController.create({
        name: "Tag#1",
      });

      const tag2 = await TagController.create({
        name: "Tag#2",
      });

      await TagController.addTutorial(tag1.id, tut1.id);
// >> added Tutorial id=1 to Tag id=1

await TagController.addTutorial(tag1.id, tut2.id);
// >> added Tutorial id=2 to Tag id=1

await TagController.addTutorial(tag1.id, tut3.id);
// >> added Tutorial id=3 to Tag id=1

await TagController.addTutorial(tag2.id, tut3.id);
// >> added Tutorial id=3 to Tag id=2

await TagController.addTutorial(tag2.id, tut4.id);
// >> added Tutorial id=4 to Tag id=2

await TagController.addTutorial(tag2.id, tut1.id);
// >> added Tutorial id=1 to Tag id=2

const _tag1 = await TagController.findById(tag1.id);
console.log(">> tag1", JSON.stringify(_tag1, null, 2));

const tags = await TagController.findAll();
console.log(">> tags", JSON.stringify(tags, null, 2));

const _tut = await TutorialController.findById(tut3.id);
console.log(">> tut3", JSON.stringify(_tut, null, 2));

const tuts = await TutorialController.findAll();
console.log(">> tuts", JSON.stringify(tuts, null, 2));

};

// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});
