import json

field_mapping = {
    'genre_name': 'name',
    'title': 'name'
}


input_file = './revised_bookchat.json'


with open(input_file, 'r', encoding='utf-8') as f:
    data = json.load(f)


# Function to replace UUID pk with auto-incremented integer
def replace_uuid_with_auto_increment(obj, pk_field="pk", start_value=1):
    new_pk = start_value
    pk_map = {}  # Dictionary to store old UUID pk -> new integer pk mapping
    for i, item in enumerate(obj, start=start_value):
        old_pk = item[pk_field]
        item[pk_field] = i
        pk_map[old_pk] = i  # Store the old pk -> new pk mapping
    return pk_map

# Function to update the 'titles' field in authors
# def update_titles_field(authors, pk_map, title_field="titles"):
#     for author in authors:
#         # Replace UUIDs with corresponding auto-incremented integers
#         updated_titles = [pk_map.get(uuid, uuid) for uuid in author["fields"].get(title_field, [])]
#         author["fields"][title_field] = updated_titles



# Separate books and authors from the data
# books = [item for item in data if item["model"] == "bookchat.book"]
authors = [item for item in data if item["model"] == "bookchat.author"]

# Replace UUID pk with auto-incremented integers in books and get the pk mapping
pk_map = replace_uuid_with_auto_increment(authors)


# Update the 'titles' field in authors to match new integer-based pk values
# update_titles_field(authors, pk_map)


with open(input_file, 'w', encoding='ascii') as f:
    json.dump(data, f, indent=4)





# def update_fields(obj):
#     if 'fields' in obj:
#         for old_field, new_field in field_mapping.items():
#             if old_field in obj['fields']:
#                 obj['fields'][new_field] = obj['fields'].pop(old_field)

# for obj in data:
#     update_fields(obj)