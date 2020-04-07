let req = require("request");

const uri = "https://ussouthcentral.services.azureml.net/workspaces/2abd23f891284eb98f5356e46b5cb743/services/02cf6ca7ede74883bdb1a84ddf9e1669/execute?api-version=2.0&details=true";
const apiKey = "m/Ounu8QlSAwqRXZRX6myxY+MEhHads9J7O558M7kxvqNfCa6raSY8Wt7PD5l2mOeV5gRCoG2RJ4oy60WoprhQ==";

let data = {
    "Inputs": {
        "input1": {
            "ColumnNames": [
                "loan_status_numeric",
                "revol_util",
                "inq_last_6mths",
                "tot_cur_bal",
                "mths_since_last_record",
                "total_rev_hi_lim",
                "mths_since_last_delinq",
                "delinq_2yrs",
                "dti",
                "pub_rec",
                "acc_now_delinq"
            ],
            "Values": [
                [
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                ],
            ]
        }
    },
    "GlobalParameters": {}
}

const options = {
    uri: uri,
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey,
    },
    body: JSON.stringify(data)
}

req(options, (err, res, body) => {
    if (!err && res.statusCode == 200) {
        console.log(body);
    } else {
        console.log("The request failed with status code: " + res.statusCode);
    }
});

console.log("+++++++++++++++++", req)