export const ICON_NAME_BLACK_LIST = ["new"];

export const ICON_NAME_REGEX = /^.van-icon-(.+)::before/;
export const ICON_ID_REGEX = /\'\\(.+)\';/;

export const GENERATOR_TEMPLATE = `
import 'package:flutter/material.dart';

const String kFlanIconsFamily = '<%=familyName%>';

class FlanIcons { 
  <% icons.forEach(function(icon){ %> 
  static const int <%=icon.name%> = 0x<%=icon.code%>;
  <% }); %>
}
`;

export const formatIconName = (source: string) => {
  let iconName = source.replace(/-/g, "_");
  if (ICON_NAME_BLACK_LIST.indexOf(iconName) != -1) {
    iconName = `${iconName}_`;
  }
  return iconName;
};
