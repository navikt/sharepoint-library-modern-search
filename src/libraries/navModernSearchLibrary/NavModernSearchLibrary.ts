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

export class NavModernSearchLibrary implements IExtensibilityLibrary {

  public getCustomWebComponents(): IComponentDefinition<any>[] {
    return [];
  }

  public getCustomSuggestionProviders(): ISuggestionProviderDefinition[] {
    return [];
  }

  public registerHandlebarsCustomizations(namespace: typeof Handlebars) {
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
