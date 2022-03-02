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
        try {
            let array = [];
            array = req.body;
            const type = await Proposal.create({
                proposal_id: array[0],
                proposal_name: array[1],
                description: array[2]
            });
            return res.json(ProposalController.parseRow(type));
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async update(req, res) {
        try {
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
        } catch (e) {
            res.status(406).send(e.message);
        }
    }

    async delete(req, res) {
        try {
            let id = req.path.toString().substring(1);
            console.log(id)
            await Proposal.destroy({
                where: {proposal_id: +id}
            });
            res.sendStatus(200);
        } catch (e) {
            res.status(406).send(e.message);
        }
    }
}

const proposalController = new ProposalController();
export default proposalController;
