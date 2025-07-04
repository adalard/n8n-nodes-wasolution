import {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WASolutionApi implements ICredentialType {
	name = 'WASolutionApi';
	displayName = 'WASolution API';
	// Uses the link to this tutorial as an example
	// Replace with your own docs links when building your own nodes
	documentationUrl = 'https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/';
	properties: INodeProperties[] = [
		{
			displayName: 'App Key',
			name: 'appkey',
			type: 'string',
			default: '',
			required: true,
			description: 'Your WASolution app key',
		},
		{
			displayName: 'Auth Key',
			name: 'authkey',
			type: 'string',
			default: '',
			required: true,
			typeOptions: { password: true },
			description: 'Your WASolution auth key',
		},
	];
	// No authentication headers required; credentials are sent as form-data in the node properties.
}
