import ProgramState from './ProgramState';

// TODO
/*
Add
block {
    ${Block}
}
in SuccessStatus and FailureStatus
*/

const TransactionStatus = `
... on SubmittedStatus {
    time
}
... on SuccessStatus {
    time
    programState {
        ${ProgramState}
    }
}
... on SqueezedOutStatus {
    reason
}
... on FailureStatus {
    time
    reason
    programState {
        ${ProgramState}
    }
}
`;

export default TransactionStatus;
