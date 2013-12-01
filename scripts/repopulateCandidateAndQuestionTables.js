var sourceCandidates = require(__dirname + '/json-data/candidates.json');
var sourceQuestions = require(__dirname + '/json-data/questions.json');

var request = require('request');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

MongoClient.connect('mongodb://pcadmin:pctoronto@paulo.mongohq.com:10023/app17991090', function (err, db) {
    db.collection('questions', function(err, questionCol) {
        db.collection('candidates', function(err, candidateCol) {

            candidateCol.remove({}, function(err, removed) {

                candidateCol.insert(sourceCandidates, function(err, candidateList) {

                    var candidateNameMap = {};
                    candidateList.forEach(function(candidate) {
                        candidateNameMap[candidate.name] = candidate;
                    });

                    var mongoQuestions = [];

                    sourceQuestions.forEach(function(question) {
                        mongoQuestions.push({
                            title: question.title,
                            itemId: question.itemId,
                            dateTime: question.dateTime,
                            agreeCandidates: candidateIdListFromNames(question.agreeCandidates, candidateNameMap),
                            disagreeCandidates: candidateIdListFromNames(question.disagreeCandidates, candidateNameMap),
                            absentCandidates: candidateIdListFromNames(question.absentCandidates, candidateNameMap)
                        });
                    });

                    questionCol.remove({}, function(err, removed) {
                        questionCol.insert(mongoQuestions, function(err, candidateList) {
                            process.exit(0);
                        });
                    });

                });

            });
            //questionCol.remove();

        });
    });
    //candidateDb = db.collection('candidates');

});

function candidateIdListFromNames(candidateNames, candidateNameMap) {
    candidateIdList = [];

    candidateNames.forEach(function(name) {
        candidateIdList.push(candidateNameMap[name]._id);
    });

    return candidateIdList;
}