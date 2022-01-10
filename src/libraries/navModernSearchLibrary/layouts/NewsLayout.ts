import { BaseLayout } from '@pnp/modern-search-extensibility';
import {
  IPropertyPaneField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';

export interface INewsLayoutProperties {
  showImage: boolean;
}

export class Newslayout extends BaseLayout<INewsLayoutProperties> {

  public onInit(): void | Promise<void> {
    this.properties.showImage = this.properties.showImage === undefined ? true : this.properties.showImage;
    super.onInit();
  }

  public getPropertyPaneFieldsConfiguration(availableFields: string[]): IPropertyPaneField<any>[] {
    
    // Initializes the property if not defined
    // this.properties.myTextProperty = this.properties.myTextProperty !== null ? this.properties.myTextProperty : "Default value";
    
    return [
      PropertyPaneToggle('layoutProperties.showImage', {
        label: 'Vis bilde',
      })
    ];
  }

}