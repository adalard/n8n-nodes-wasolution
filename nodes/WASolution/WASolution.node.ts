import { INodeType, INodeTypeDescription, IExecuteFunctions } from 'n8n-workflow';

export class WASolution implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WASolution',
		name: 'WASolution',
		icon: 'file:wasolution.png',
		group: ['transform'],
		version: 1,
		subtitle: 'WASolution WhatsApp Integration',
		description: 'Sent WhatsApp message via WaSolution API',
		defaults: {
				name: 'WASolution',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
				{
						name: 'WASolutionApi',
						required: true,
				},
		],
		requestDefaults: {
				baseURL: 'https://wasolution.getlifeeasy.com/api/create-message',
				method: 'POST',
				headers: {
					Accept: 'application/json',
					// Content-Type will be set automatically for form-data
				},
			},

			// WASolution WhatsApp API fields
			properties: [

				{
					displayName: 'To (WhatsApp Number)',
					name: 'to',
					type: 'string',
					default: '',
					required: true,
					description: 'Recipient WhatsApp number (e.g. 60123456789)',
				},
				{
					displayName: 'Message',
					name: 'message',
					type: 'string',
					default: '',
					required: true,
					description: 'Message to send',
				},
				{
					displayName: 'File (Optional)',
					name: 'file',
					type: 'string',
					default: '',
					required: false,
					description: 'Optional file URL or path to send as an attachment',
				},
			],
	};

	async execute(this: IExecuteFunctions) {
		const items = this.getInputData();
		const returnData = [];
		const credentials = await this.getCredentials('WASolutionApi');

		for (let i = 0; i < items.length; i++) {
			const to = this.getNodeParameter('to', i) as string;
			const message = this.getNodeParameter('message', i) as string;
			const file = this.getNodeParameter('file', i) as string;

			const options = {
				method: 'POST' as 'POST',
				uri: 'https://wasolution.getlifeeasy.com/api/create-message',
				formData: {
					appkey: credentials.appkey,
					authkey: credentials.authkey,
					to,
					message,
					file,
				},
				json: true,
			};

			const responseData = await this.helpers.request(options);
			returnData.push(responseData);
		}

		return this.prepareOutputData(returnData);
	}
}
