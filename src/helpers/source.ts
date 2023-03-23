import {SourceControllerService} from '../services'

export const getSource = async () =>{
    const data = await
        SourceControllerService
            .sourceControllerFind(
                `{"where":{"status": true}}`
            );
    return data;
}