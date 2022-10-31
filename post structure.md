Posts will have: posts: [
{
id,
category,
title,
post(only a part of it....), //can be extracted when retrieving it?
author:userId,
comments.count
}
]
A Post can have :
Id,
category,
Post,
Author: userID,
createdAt: date,
Updated?: date,
Comments?: [
{Comment, userid}
]

problem statement - posts can have many categories & categories can have many posts
if category exists, create post with existing category else create a new category
