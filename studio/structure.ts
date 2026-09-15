import type {StructureResolver} from 'sanity/structure'

const singletonTypes = ['siteSettings', 'homePage', 'notFoundPage']

const singletonTitles: Record<string, string> = {
  siteSettings: 'Ρυθμίσεις Site',
  homePage: 'Marketing Landing',
  notFoundPage: 'Σελίδα 404',
}

function singleton(S: Parameters<StructureResolver>[0], typeName: string) {
  const title = singletonTitles[typeName] ?? typeName
  return S.listItem()
    .title(title)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Περιεχόμενο')
    .items([
      singleton(S, 'siteSettings'),
      S.divider(),
      singleton(S, 'homePage'),
      singleton(S, 'notFoundPage'),
      S.documentTypeListItem('contentPage').title('Σελίδες Περιεχομένου'),
      S.divider(),
      S.listItem()
        .title('Φόρμες ενδιαφέροντος')
        .id('formSubmission-interest')
        .child(
          S.documentList()
            .title('Υποβολές ενδιαφέροντος')
            .schemaType('formSubmission')
            .apiVersion('2024-01-01')
            .filter('_type == "formSubmission" && formType == "interest"')
            .defaultOrdering([{field: 'submittedAt', direction: 'desc'}]),
        ),
    ])

export {singletonTypes}
