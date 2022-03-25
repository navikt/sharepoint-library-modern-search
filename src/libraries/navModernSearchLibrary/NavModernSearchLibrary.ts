import { ServiceKey } from "@microsoft/sp-core-library";
import {
  IExtensibilityLibrary,
  IComponentDefinition,
  ISuggestionProviderDefinition,
  ILayoutDefinition,
  LayoutType,
  ILayout
} from "@pnp/modern-search-extensibility";
import { Newslayout } from "./layouts/NewsLayout";
import { ServiceMessageslayout } from "./layouts/ServiceMessagesLayout";
import * as moment from 'moment';

export class NavModernSearchLibrary implements IExtensibilityLibrary {

  public getCustomWebComponents(): IComponentDefinition<any>[] {
    return [];
  }

  public getCustomSuggestionProviders(): ISuggestionProviderDefinition[] {
    return [];
  }

  public registerHandlebarsCustomizations(namespace: typeof Handlebars) {
    namespace.registerHelper('withGroupServiceMessages', (array: {}[], dateProp: string, priorityProp: string, options) => {
      let result = '';
      if (Array.isArray(array) && array.length > 0) {
        // Sort all service messages by date reversed chronologically
        array.sort((a,b) => new Date(b[dateProp]).getTime() - new Date(a[dateProp]).getTime());
        // Sort service messages by priority
        const priorityOrder = ['Kritisk', 'Advarsel', 'Informasjon'];
        array.sort((a,b) => priorityOrder.indexOf(a[priorityProp]) - priorityOrder.indexOf(b[priorityProp]));
        // Chunk by date to separate active and planned servicemessages
        let subcontext = {'active': [],'planned': []};
        array.map(value => {
          if (moment(value[dateProp]).isSameOrBefore()) subcontext.active.push(value);
          else subcontext.planned.push(value);
        });
        // Sort planned messages by date chronologically
        subcontext.planned.sort((a,b) => new Date(a[dateProp]).getTime() - new Date(b[dateProp]).getTime());
        result += options.fn(subcontext);
      }
      return result;
    });
  }

  public getCustomLayouts(): ILayoutDefinition[] {
    return [
      {
        name: 'NAV nyheter',
        iconName: 'News',
        key: 'NewsLayout',
        type: LayoutType.Results,
        templateContent: require('./layouts/news-layout.html'),
        serviceKey: ServiceKey.create<ILayout>('NAV:NewsLayout', Newslayout),
      },
      {
        name: 'NAV drifts-meldinger',
        iconName: 'Warning',
        key: 'ServiceMessageslayout',
        type: LayoutType.Results,
        templateContent: require('./layouts/service-messages-layout.html'),
        serviceKey: ServiceKey.create<ILayout>('NAV:ServiceMessageslayout', ServiceMessageslayout),
      }
    ];
  }
}
