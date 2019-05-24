<template>
  <div class="organization-right">
    <ranking></ranking>
    <organization-introduction :data="data"></organization-introduction>
    <business-layout></business-layout>
    <products-services :orgId="data.orgId"></products-services>
    <organize-events></organize-events>
    <reward></reward>
    <collaborative-record></collaborative-record>
  </div>
</template>
<script>
import Ranking from './Ranking'
import OrganizationIntroduction from './OrganizationIntroduction'
import BusinessLayout from './BusinessLayout'
import ProductsServices from './ProductsServices'
import OrganizeEvents from './OrganizeEvents'
import Reward from './Reward'
import CollaborativeRecord from './CollaborativeRecord'
export default {
  props: {
    data: {
      type: Object,
    },
  },
  components: { Ranking, OrganizationIntroduction, BusinessLayout, ProductsServices, OrganizeEvents, Reward, CollaborativeRecord },
}
</script>
