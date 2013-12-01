var request = require('request');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;


var questionDb;
var candidateDb;

MongoClient.connect('mongodb://pcadmin:pctoronto@paulo.mongohq.com:10023/app17991090', function (err, db) {
    questionDb = db.collection('questions');
    candidateDb = db.collection('candidates');
});

var candidatesSmall = [
    {name: 'Paul Ainslie', id: '2'}
];

var candidates = [
    {name: 'Paul Ainslie', id: '2'},
    {name: 'Maria Augimeri', id: '4'},
    {name: 'Ana Bailão', id: '486'},
    {name: 'Michelle Berardinetti', id: '493'},
    {name: 'Shelley Carroll', id: '6'},
    {name: 'Raymond Cho', id: '7'},
    {name: 'Josh Colle', id: '485'},
    {name: 'Gary Crawford', id: '494'},
    {name: 'Vincent Crisanti', id: '481'},
    {name: 'Janet Davis', id: '8'},
    {name: 'Glenn De Baeremaeker', id: '9'},
    {name: 'Mike Del Grande', id: '10'},
    {name: 'Frank Di Giorgio', id: '11'},
    {name: 'Sarah Doucette', id: '484'},
    {name: 'John Filion', id: '46'},
    {name: 'Paula Fletcher', id: '14'},
    {name: 'Doug Ford', id: '482'},
    {name: 'Rob Ford', id: '15'},
    {name: 'Mary Fragedakis', id: '491'},
    {name: 'Mark Grimes', id: '17'},
    {name: 'Doug Holyday', id: '20'},
    {name: 'Norman Kelly', id: '22'},
    {name: 'Mike Layton', id: '487'},
    {name: 'Chin Lee', id: '23'},
    {name: 'Peter Leon', id: '981'},
    {name: 'Gloria Lindsay Luby', id: '24'},
    {name: 'Giorgio Mammoliti', id: '25'},
    {name: 'Josh Matlow', id: '488'},
    {name: 'Pam McConnell', id: '26'},
    {name: 'Mary-Margaret McMahon', id: '492'},
    {name: 'Joe Mihevc', id: '27'},
    {name: 'Peter Milczyn', id: '28'},
    {name: 'Denzil Minnan-Wong', id: '29'},
    {name: 'Ron Moeser', id: '30'},
    {name: 'Frances Nunziata', id: '32'},
    {name: 'Cesar Palacio', id: '34'},
    {name: 'John Parker', id: '36'},
    {name: 'James Pasternak', id: '483'},
    {name: 'Gord Perks', id: '37'},
    {name: 'Anthony Perruzza', id: '38'},
    {name: 'Jaye Robinson', id: '489'},
    {name: 'David Shiner', id: '41'},
    {name: 'Karen Stintz', id: '42'},
    {name: 'Michael Thompson', id: '43'},
    {name: 'Adam Vaughan', id: '44'},
    {name: 'Kristyn Wong-Tam', id: '490'}
];

function finishedDownloadingCsv() {
    //if something.length == candidates.length
}

candidatesSmall.forEach(function(candidate) {
    request(
        {
            url: 'http://app.toronto.ca/tmmis/getAdminReport.do',
            method: 'POST',
            form: {
                function: 'getMemberVoteReport',
                download: "csv",
                page: "0",
                itemsPerPage: "50",
                sortBy: "",
                sortOrder: "",
                exportPublishReportId: "2",
                termId: "4", //Corresponds to 2010-2014
                memberId: candidate.id,
                decisionBodyId: "261", //Restricts to votes in city council
                fromDate: "",
                toDate: ""
            }
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //console.log(body);

                //slice(1) removes the heading names from the csv
                var lines = body.split('\n').slice(1);
                lines.forEach(function(line, lineIndex) {
                    var fields = line.split(',');
                    var curVoteRecord = {
                        committee: fields[0],
                        dateTime: fields[1],
                        agendaItem: fields[2],
                        agendaItemTitle: fields[3],
                        motionType: fields[4]
                    };

                    console.log(fields[0]);
                });

                var voteRecords = CSVToArray(body);

                finishedDownloadingCsv();
            } else {
                process.exit(0);
            }
        }
    );
});

