import {models} from '../models/models';

let Proposal = models.Proposal;

class ProposalController {
    async getAll(req, res) {
        const type = await Proposal.findAll();

        const entitiesArr = JSON.parse(JSON.stringify(type));
        const resp = {
            colNames: [
                "proposal_id",
                "proposal_name",
                "description"
            ],
            data: [],
        };
        for (let i = 0; i < entitiesArr.length; i++) {
            resp.data.push([
                entitiesArr[i].proposal_id,
                entitiesArr[i].proposal_name,
                entitiesArr[i].description,
            ]);
        }
        return res.json(resp);
    }

    static parseRow = (Proposal: any) => {
        const arr = new Array<string>();
        return [
            Proposal.proposal_id,
            Proposal.proposal_name,
            Proposal.description,
        ];
    }

    async create(req, res) {
        let [
            proposal_id,
            proposal_name,
            description
        ] = req.body;
        const type = await Proposal.create({
            proposal_id,
            proposal_name,
            description
        });
        return res.json(ProposalController.parseRow(type));
    }

    async update(req, res) {
        let array = [];
        array = req.body.data;
        for (let i = 0; i < array.length; i++) {
            await Proposal.update(
                {
                    proposal_name: array[i][1],
                    description: array[i][2],
                },
                {
                    where: {proposal_id: array[i][0]}
                }
            )
        }
        return res.json(array);
    }

    async delete(req, res) {
        let id = req.path.toString().substring(1);
        console.log(id)
        await Proposal.destroy({
            where: {proposal_id: +id}
        });
        res.sendStatus(200);
    }
}

const proposalController = new ProposalController();
export default proposalController;
