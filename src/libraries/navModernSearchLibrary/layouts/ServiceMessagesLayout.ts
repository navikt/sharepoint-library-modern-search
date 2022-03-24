import { BaseLayout } from '@pnp/modern-search-extensibility';
import {
  IPropertyPaneField, PropertyPaneToggle
} from '@microsoft/sp-property-pane';

export interface IServiceMessagesLayoutProperties {
  showLinks: boolean;
  showFrame: boolean;
  showSummary: boolean;
}

export class ServiceMessageslayout extends BaseLayout<IServiceMessagesLayoutProperties> {

  public onInit(): void | Promise<void> {
    this.properties.showLinks = this.properties.showLinks === undefined ? false : this.properties.showLinks;
    this.properties.showFrame = this.properties.showFrame === undefined ? false : this.properties.showFrame;
    this.properties.showSummary = this.properties.showSummary === undefined ? false : this.properties.showSummary;
    super.onInit();
  }

  public getPropertyPaneFieldsConfiguration(availableFields: string[]): IPropertyPaneField<any>[] {
    
    return [
      PropertyPaneToggle('layoutProperties.showLinks', {
        label: 'Vis lenker',
      }),
      PropertyPaneToggle('layoutProperties.showFrame', {
        label: 'Vis ramme',
      }),
      PropertyPaneToggle('layoutProperties.showSummary', {
        label: 'Vis sammendrag',
      }),
    ];
  }

}